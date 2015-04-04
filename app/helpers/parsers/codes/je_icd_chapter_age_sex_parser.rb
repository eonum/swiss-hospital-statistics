require 'parsers/streams/je_age_sex_stream'
require 'datasets/icd_chapter_age_sex_dataset'
require 'parsers/abstract/abstract_je_d_parser'

class JeIcdChapterAgeSexParser < AbstractJeDParser

  def initialize(file)
    super(file)
    @first_row = 9
    @last_row = 113
    @interval_column = 1
    @code_column = 2
    @percentage_column = 3
    @number_column = 4
  end

  private

  def parse_row(row)
    set_interval(row)

    dataset = IcdChapterAgeSexDataset.new
    dataset.year = @year
    data = dataset.new_data

    category = IcdChapterSexIntervalCategory.new
    p  = @sheet.cell(row, @percentage_column)
    category.percentage = (p.is_a? Numeric) ? p : 0
    n = @sheet.cell(row, @number_column)
    category.number = (n.is_a? Numeric) ? n : 0
    category.sex = @gender

    category.interval = @interval

    data.add(category)

    dataset.code = @sheet.cell(row, @code_column).split.first

    dataset
  end

end