require 'parsers/abstract/composite_parser'
require 'parsers/streams/je_age_sex_stream'
require 'datasets/age_sex_dataset'

class JeAgeSexParser

  INTERVAL_COLUMN = 1
  CODE_COLUMN = 2
  PERCENTAGE_COLUMN = 3
  DAD_COLUMN = 4

  def initialize(file)
    @sheet = Roo::Excel.new(file)
    @sheet.default_sheet = @sheet.sheets.first
    @first_row = 8
    @last_row = 91
  end

  def stream
    JeAgeSexStream.new(@datasets)
  end

  def parse
    @datasets = []
    @sheet.sheets.each_with_index { |sheet, index|
       @sheet.default_sheet = sheet

       @year = sheet[0..3].to_i
      # set the gender of the results, 0 = women, 1 = men, 2 = total
      if index % 3 == 0
        # total sheet
        @gender = 2
      elsif index % 3 == 1
         @gender = 1
      elsif index % 3 == 2
        @gender = 0
      end

      (@first_row .. @last_row).each do |row_index|
        # the second column always contains a value
        if @sheet.cell(row_index, CODE_COLUMN).nil?
          next
        end
        dataset = parse_row(row_index)
        unless dataset.nil?
          @datasets.push(dataset)
        end
      end
    }

    @datasets
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
    category.percentage = @sheet.cell(row, PERCENTAGE_COLUMN)
    category.dad = @sheet.cell(row, DAD_COLUMN)

    category.interval = @interval

    data.add(category)

    dataset.code = @sheet.cell(row, CODE_COLUMN).split.first

    dataset
  end

  def set_interval(row)
    # new interval
    unless @sheet.cell(row, INTERVAL_COLUMN).nil?
      @interval = Interval.new.from_s(@sheet.cell(row, INTERVAL_COLUMN))
    end
  end

  def update_hospital_type(row)
    # hospital type
    unless @sheet.cell(row, CODE_COLUMN) =~ /\d/
      if @year == 1998
        return handle_special_1998_case(row)
      end

      @hospital_type = HospitalType.where(:text_de => @sheet.cell(row, CODE_COLUMN)).first
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