class Drg
  include Mongoid::Document
  belongs_to :mdc

  field :code, :type => String
  field :text_de, :type => String
  field :text_fr, :type => String
  field :text_it, :type => String
  field :version, :type => String

  field :cost_weight, :type => Float
  field :first_day_surcharge, :type => Integer
  field :first_day_discount, :type => Integer
  field :surcharge_per_day, :type => Float
  field :discount_per_day, :type => Float
  field :avg_duration, :type => Float
  field :transfer_flatrate, :type => Float
  field :partition, :type => String

  include MultiLanguageText

  def self.selection_map description_all_or_none
    map = Drg.all.map { |drg| [drg.code, drg.code] }.sort.reverse
    map << [description_all_or_none, ""]
    return map.reverse
  end
end
