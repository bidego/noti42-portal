1. Crear recursos para la nueva VM

# Crear grupo de instancias para la nueva VM
gcloud compute instance-groups unmanaged create noti42-main-group \
    --zone=us-central1-a

gcloud compute instance-groups unmanaged add-instances noti42-main-group \
    --instances=noti42-portal-vm \
    --zone=us-central1-a

# Configurar el puerto (asume que tu nueva VM usa puerto 3000)
gcloud compute instance-groups unmanaged set-named-ports noti42-main-group \
    --named-ports=http:3000 \
    --zone=us-central1-a

# Crear health check para la nueva VM
gcloud compute health-checks create http noti42-main-health-check \
    --port=3000 \
    --request-path=/health/liveness

# Crear backend service para la nueva VM
gcloud compute backend-services create noti42-main-backend \
    --protocol=HTTP \
    --port-name=http \
    --health-checks=noti42-main-health-check \
    --global

gcloud compute backend-services add-backend noti42-main-backend \
    --instance-group=noti42-main-group \
    --instance-group-zone=us-central1-a \
    --global


2. Actualizar el certificado SSL
# Eliminar el certificado existente
gcloud compute forwarding-rules delete noti42-https-rule --global
gcloud compute target-https-proxies delete noti42-https-proxy --global
gcloud compute ssl-certificates delete noti42-ssl-cert --global

# Crear nuevo certificado que incluya ambos dominios
gcloud compute ssl-certificates create noti42-ssl-cert \
    --domains=admin.noti42.com,noti42.com \
    --global

gcloud compute target-https-proxies create noti42-https-proxy \
    --url-map=noti42-lb \
    --ssl-certificates=noti42-ssl-cert

gcloud compute forwarding-rules create noti42-https-rule \
    --global \
    --target-https-proxy=noti42-https-proxy \
    --ports=443

3. Actualizar el URL Map
# Actualizar el URL map para incluir routing por host
gcloud compute url-maps edit noti42-lb
# En el editor, reemplaza el contenido con:
name: noti42-lb
defaultService: https://www.googleapis.com/compute/v1/projects/vinder-451113/global/backendServices/noti42-main-backend
hostRules:
- hosts:
  - admin.noti42.com
  pathMatcher: admin-matcher
- hosts:
  - noti42.com
  pathMatcher: main-matcher
pathMatchers:
- name: admin-matcher
  defaultService: https://www.googleapis.com/compute/v1/projects/vinder-451113/global/backendServices/noti42-backend
- name: main-matcher
  defaultService: https://www.googleapis.com/compute/v1/projects/vinder-451113/global/backendServices/noti42-main-backend


# Crear regla específica para health checks
gcloud compute firewall-rules create allow-main-health-check \
    --allow tcp:3000 \
    --source-ranges 130.211.0.0/22,35.191.0.0/16 \
    --target-tags http-server \
    --description "Allow health check from Google Cloud Load Balancer"
