require 'abstract/interval_category'

class IcdChapterSexIntervalCategory < IntervalCategory

  @tag = :icd_chapter_sex_interval

  attr_accessor :percentage
  # number per 1000 inhabitants
  attr_accessor :number
  attr_accessor :sex
end