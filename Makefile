install:
	npm install

## Build static files
build:
	gulp build

## Publish
deploy@prod:
	rsync -arzv --delete index.html css dist ost dédié:/home/tom32i/thrust

## Publish
deploy@demo:
	rsync -arzv --delete index.html css dist ost tom32i@deployer.dev:/home/tom32i/thrust
