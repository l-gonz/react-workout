aws dynamodb create-table --cli-input-json file://database/users.json
aws dynamodb create-table --cli-input-json file://database/workouts.json
aws dynamodb create-table --cli-input-json file://database/training-plans.json
aws dynamodb list-tables