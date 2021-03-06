# swiss-hospital-statistics
This web-based visualization project is developed by a group of students from the [IAM](https://www.iam.unibe.ch/) from the University of Berne and is managed and maintained by [eonum](http://www.eonum.ch/). The sources of the visualized data can be found on [the Swiss Statistics Web site](http://www.bfs.admin.ch/bfs/portal/de/index/themen/14/01/new/nip_detail.html?gnpID=2014-370) maintained by the Federal Statistical Office (FSO).

The project is deployed at [http://swiss-hospital-statistics.eonum.ch/](http://swiss-hospital-statistics.eonum.ch/)

## Goal
This project aims to visualize swiss hospital statistics. The statistics provided by the BFS (Bundesamt für Statistik) are extensive and only partially overseeable. Through the help of applicable visualizations this data should be made simpler and easily accessible.

## Instructions for setting up the project

### Set up the project
The project can be used with Ruby 2.0 or Ruby 2.1. After downloading the project, a *mongoid.yml* file has to be created for the project. It should look something like this, but must be adapted for the specific MongoDB installation:

	development:
  		sessions:
    		default:
      			database: drg_scaffold
      			hosts:
       				- 127.0.0.1:27017
	test:
  		sessions:
    		default:
      			database: drg_scaffold_test
     			hosts:
        			- 127.0.0.1:27017

	production:
  		sessions:
    		default:
      			database: drg_scaffold
     			hosts:
        			- 127.0.0.1:27017


The *mongoid.yml* file must be placed in the *config* folder of the project.

### Seed the database and parse the statistics
The ICD, CHOP and DRG catalogs have to be seeded into the database. Additionally, the statistics have to be parsed. For this, execute the rake task *rake db:seed*. This might take a few moments to complete.

### Use the visualizations

Start the server up by running the production configuration (or alternatively the development configuration for development). Visit the URL [http://localhost:3000/](http://localhost:3000/).

### Run tests

The unit tests of this project consist of ruby tests that mainly cover the statistics parsers and of javascript tests that cover the frontend, namely the visualisations and the data converters.

- To run the ruby tests, the rake task *test:units* can be used. Please note that MongoDB needs to be running. The tests will run in the database specified in the *mongoid.yml* file.
- For the javascript unit tests the teaspoon gem is used. This gem is only available in the development environment. To run the tests, the development configuration has to be run. Once the server is started, the javascript testing is available under the URL [http://localhost:3000/teaspoon/default](http://localhost:3000/teaspoon/default). Note that if one or multiple tests show 'undefined' as one of the variables they're comparing, the tests haven't properly been loaded. Just run them again and you should get the correct results.

### Recompile minified app for production
All Javascript resources are bundled in the file */public/javascripts/application.min.js* for production. You can recompile the resources using the script "compile.sh* in the root folder. Make sure you have Node.js installed on your system.
