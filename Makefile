project = kartoza/postgis
containerName = database.omnistack
imageName = $(project)

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help
	- @awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Docker tasks
start: ## Starts a stopped container
	- docker container start $(containerName)

run: ## Run container on port configured on `.env` file
	- docker run \
		--name $(containerName) \
		-p 5432:5432 \
		-d -t $(imageName)

bash: ## Start bash inside container
	- docker exec -it ${containerName} bash
