class Mdc
  include Mongoid::Document
  include MultiLanguageText

  has_many :drgs

  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :version, :type => String
end