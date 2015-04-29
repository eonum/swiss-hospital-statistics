class IcdGroup
  include Mongoid::Document
  include MultiLanguageText

  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
end