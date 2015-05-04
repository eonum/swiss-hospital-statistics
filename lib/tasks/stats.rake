namespace :statistics do
  desc "parses all statistics"
  task :parseAll => :environment do
    Catalog.new.update_db
  end

  desc "all statistics, argument e.g. IcdCodeDataset"
  task :parse, [:type] =>  [:environment] do |t, args|
    unless args.type.nil?
      Catalog.new.update_db_code(args.type.constantize)
    end
  end

end
