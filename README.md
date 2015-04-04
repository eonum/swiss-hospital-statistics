# swiss-hospital-statistics

## Goal
This project aims to visualize swiss hospital statistics. The statistics provided by the BFS (Bundesamt für Statistik) are extensive and only partially overseeable. Through the help of applicable visualizations this data should be made simpler and easily accessible.

## Instructions for setting up the project

### Restore dump into MongoDB
In order to be able to use the project, the data dump of the ICD, CHOP and DRG catalog must be imported into the local MongoDB installation. This can be done by issuing the commmand

	mongorestore --dbpath /path/to/dump --db drg_scaffold_development

on the commmand line.

### Set up the project
The project can be used with Ruby 2.0 or Ruby 2.1. After downloading the project, a *mongoid.yml* file has to be created for the project. It should look something like this, but must be adapted for the specific MongoDB installation:

	development:
  		sessions:
    		default:
      			database: drg_scaffold_development
      			hosts:
       				- 127.0.0.1:27017
	test:
  		sessions:
    		default:
      			database: drg_scaffold_test
     			hosts:
        			- 127.0.0.1:27017

The *mongoid.yml* file must be placed in the *config* folder of the project.

### Seed the database
Some data like hospital types has to be seeded into the database first. For this, execute the rake task *rake db:seed*.

### Parse the statistics
In order to use the visualisations, the statistics have to be parsed first. To do this, go to the file *app/controllers/api/v1/codes_controller.rb* and change the line containing the *Catalog.new.update_db_code* method call with the datasets you want to parse (e.g. *IcdCodeDataset*, *ChopCodeDataset*, *DrgCodeDataset*, etc.).
Then, start up the server by running the *Development* run configuration. Once the server is started, go to the url
[http://localhost:3000/api/v1/codes/new](http://localhost:3000/api/v1/codes/new), which will parse the dataset that you selected. This will take a few minutes to complete. The message *OK* will be displayed when the process finishes.

The parsing is initiated by the *Catalog* class. It searches for all datasets that define a parser for themselves and then calls these parsers on the datasets. For example, the parser *SuChopDrgIcdParser* is responsible for parsing ICD, CHOP and DRG datasets.

### Use the visualizations

Visit the URL [http://localhost:3000/](http://localhost:3000/).