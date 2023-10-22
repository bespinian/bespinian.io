.PHONY: apply
apply:
	tofu init
	tofu apply

.PHONY: lint
lint:
	tflint --init
	tflint --recursive
