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

  def ChopCode::to_json
    return "{
            codes: {
                chop: {
                    description: 'Chop code Description'
                },
                icd: {
                    description: 'ICD code Description'
                },
                ke: {
                    description: 'KE code Description'
                },
                age: {
                    description: 'AGE code Description'
                }
            }
        }"

  end
end
