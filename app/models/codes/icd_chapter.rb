class IcdChapter
  include Mongoid::Document

  field :roman_number, :type => String
  field :number, :type => Integer
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
end