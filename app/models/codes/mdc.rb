class Mdc
  include Mongoid::Document
  include MultiLanguageText

  has_many :adrgs

  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :prefix, :type => String
end