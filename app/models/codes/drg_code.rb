class DrgCode
  include Mongoid::Document

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
end