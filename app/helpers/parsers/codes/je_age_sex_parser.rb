require 'parsers/abstract/composite_parser'
require 'parsers/streams/je_age_sex_stream'
require 'datasets/age_sex_dataset'
require 'parsers/abstract/abstract_je_d_parser'

class JeAgeSexParser < AbstractJeDParser

  def initialize(file)
    super(file)
    @first_row = 8
    @last_row = 91
    @interval_column = 1
    @code_column = 2
    @percentage_column = 3
    @dad_column = 4
  end

  private

  def parse_row(row)
    if update_hospital_type(row)
      return
    end
    set_interval(row)

    dataset = AgeSexDataset.new
    dataset.year = @year
    data = dataset.new_data

    category = SexIntervalCategory.new
    category.hospital_type = @hospital_type
    category.sex = @gender
    category.percentage = @sheet.cell(row, @percentage_column)
    category.dad = @sheet.cell(row, @dad_column)

    category.interval = @interval

    data.add(category)

    dataset.code = @sheet.cell(row, @code_column).split.first

    dataset
  end

  def update_hospital_type(row)
    # hospital type
    unless @sheet.cell(row, @code_column) =~ /\d/
      if @year == 1998
        return handle_special_1998_case(row)
      end

      @hospital_type = HospitalType.where(:text_de => @sheet.cell(row, @code_column)).first
      return true
    end
    false
  end

  def handle_special_1998_case(row)
    # in 1998 the statistics structure was different
    mappings = {8 => "Allgemeine Krankenhäuser, Zentrumsversorgung", 25 => "Spezialkliniken: Psychiatrische Kliniken",
    42 => "Spezialkliniken: Rehabilitationskliniken"}
    @hospital_type = HospitalType.where(:text_de => mappings[row]).first
    true
  end

 end