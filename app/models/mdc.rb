class Mdc
  include Mongoid::Document
  has_many :drgs
  include MultiLanguageText

  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :version, :type => String

end
