In order to run this project run the following commands ( You need to have Node.js installed in order to run the npm command )

# install all required libraries ( it will download node modules and after this it will run bower )
npm install

# run development server
grunt start

# run development server with middleware (Mock API)
grunt start --middleware

# build develop package (it will be stored in .tmp folder)
grunt buildDevelop

# build production package (it will be stored in public folder)
grunt buildProduction

# to run unit test use following command
grunt test --single-run