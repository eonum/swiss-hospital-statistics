require 'abstract/interval_category'

class IcdChapterSexIntervalCategory < IntervalCategory

  @tag = :icd_chapter_sex_interval

  field :percentage, :type => Float
  # number per 1000 inhabitants
  field :number, :type => Float
  field :sex, :type => Integer
end