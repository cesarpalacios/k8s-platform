CONTEXT?=devcdk

REF=${shell git rev-parse --short HEAD}
TAG=${CONTEXT}:dev-${REF}
LATEST=${CONTEXT}:latest

build:
	docker buildx build \
	--tag ${TAG} \
	--platform linux/amd64 \
	--load \
	${CONTEXT}

# clean must be added to remove previous image versions
