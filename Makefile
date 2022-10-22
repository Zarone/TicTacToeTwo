format:
	prettier --write .

build:
	yarn workspace @tictactoe/client build
	yarn workspace @tictactoe/server build

dev:
	yarn dev

test:
	yarn test
