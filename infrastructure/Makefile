.PHONY: apply
apply:
	terraform init
	terraform apply

.PHONY: lint
lint:
	tflint --init
	tflint --recursive
