
if defined?(Bundler)
  groups = {
      development: %(development),
      production: %(production),
      test: %(test)
  }

  load_groups = [:default, :rails4, :ui, :db, :templates, :javascript, Rails.env]
  load_groups.concat groups.map { |k,v| k if v.include?(Rails.env) }
  load_groups.compact!
  Bundler.require(*load_groups)
end