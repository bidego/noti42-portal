PROJECT_ID := vinder-451113
IMAGE_NAME := noti42-portal
IMAGE_TAG := latest
FULL_IMAGE_NAME := gcr.io/$(PROJECT_ID)/$(IMAGE_NAME):$(IMAGE_TAG)
VM_NAME := noti42-portal-vm
ZONE := us-central1-a # You can change this to your preferred zone

.PHONY: all build push deploy create-vm delete-vm clean

all: deploy

build:
	@echo "Building Docker image..."
	docker build -t $(FULL_IMAGE_NAME) -f Dockerfile .

push:
	@echo "Pushing Docker image to GCR..."
	docker push $(FULL_IMAGE_NAME)

run:
	@echo "Running Docker image locally..."
	docker run -p 8080:3000 $(FULL_IMAGE_NAME)

create-vm:
	@echo "Creating GCP Compute Engine VM and deploying container..."
	gcloud compute instances create-with-container $(VM_NAME) \
		--project=$(PROJECT_ID) \
		--zone=$(ZONE) \
		--machine-type=e2-micro \
		--container-image=$(FULL_IMAGE_NAME) \
		--container-env=PORT=3000 \
		--tags=http-server,https-server \
		--boot-disk-size=10GB \
		--boot-disk-type=pd-balanced \
		--boot-disk-device-name=$(VM_NAME) \
		--scopes=https://www.googleapis.com/auth/cloud-platform

	@echo "Allowing HTTP/HTTPS traffic..."
	gcloud compute firewall-rules create default-allow-http-80 \
		--allow=tcp:80 \
		--source-ranges=0.0.0.0/0 \
		--target-tags=http-server \
		--project=$(PROJECT_ID) || true

	gcloud compute firewall-rules create default-allow-https-443 \
		--allow=tcp:443 \
		--source-ranges=0.0.0.0/0 \
		--target-tags=https-server \
		--project=$(PROJECT_ID) || true

	@echo "VM creation and deployment initiated. It may take a few minutes for the VM to be ready."
	@echo "You can get the external IP with: gcloud compute instances describe $(VM_NAME) --zone=$(ZONE) --format='get(networkInterfaces[0].accessConfigs[0].natIP)'"

deploy: build push create-vm
	@echo "Deployment process completed."

delete-vm:
	@echo "Deleting GCP Compute Engine VM..."
	gcloud compute instances delete $(VM_NAME) --zone=$(ZONE) --quiet --project=$(PROJECT_ID)
	@echo "Deleting firewall rules..."
	gcloud compute firewall-rules delete default-allow-http-80 --quiet --project=$(PROJECT_ID) || true
	gcloud compute firewall-rules delete default-allow-https-443 --quiet --project=$(PROJECT_ID) || true

shell:
	gcloud compute ssh $(VM_NAME) --zone $(ZONE)

clean:
	@echo "Cleaning up local Docker images..."
	docker rmi $(FULL_IMAGE_NAME) || true

add-instance-to-group:
	gcloud compute instance-groups unmanaged add-instances noti42-main-group --instances=noti42-portal-vm --zone=us-central1-a

redeploy: push delete-vm create-vm add-instance-to-group
	@echo "Deployment process completed."
