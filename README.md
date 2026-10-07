This is 3-trie app for Book management app, build in frontend in HTML, backend in nodejs and database Mongo DB.

<img width="1821" height="671" alt="image" src="https://github.com/user-attachments/assets/b339a4dc-fc2f-485e-b7b4-4e32bbc41afe" />

# First run all k8s file (deployment, namespace, service)
######
# To expose port to access in browser
kubectl port-forward service/nginx-services -n nginx 8080:80 --address=0.0.0.0

# expose port in backgroup
nohup kubectl port-forward service/book-manager-app-sv -n book-manager-app 8000:80 --address=0.0.0.0 &
