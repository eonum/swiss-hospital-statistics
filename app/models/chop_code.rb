class ChopCode
  include Mongoid::Document
  include MultiLanguageText

  has_and_belongs_to_many :parents, class_name: 'ChopNonterminal'

  field :short_code, :type => String
  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :version, :type => String

  @years = {  };

  def to_json
    return {
        code: self.code,
        description: self.text_de,
        years: self.years.to_json
    }
  end
end
