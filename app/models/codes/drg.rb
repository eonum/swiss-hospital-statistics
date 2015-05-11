class Drg
    include Mongoid::Document
    include MultiLanguageText

    belongs_to :adrg
    has_many :drg_code_datasets

    field :code, :type => String
    field :text_de, :type => String
    field :text_fr, :type => String
    field :text_it, :type => String

    field :partition, :type => String
    field :cost_weight, :type => Float
    field :avg_duration, :type => Float
    field :first_day_discount, :type => Integer
    field :discount_per_day, :type => Float
    field :first_day_surcharge, :type => Integer
    field :surcharge_per_day, :type => Float
    field :transfer_flatrate, :type => Float
    field :exception_from_reuptake, :type => Boolean
end