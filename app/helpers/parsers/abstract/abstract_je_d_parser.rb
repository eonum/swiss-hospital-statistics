class AbstractJeDParser

  def initialize(file)
    @sheet = Roo::Excel.new(file)
    @sheet.default_sheet = @sheet.sheets.first
  end

  def stream
    JeAgeSexStream.new(@datasets)
  end

  def parse
    @datasets = []
    @sheet.sheets.each_with_index { |sheet, index|
      parse_sheet(sheet, index)
    }
    @datasets
  end

  protected

  def parse_sheet(sheet_name, sheet_index)
    @sheet.default_sheet = sheet_name
    @year = sheet_name[0..3].to_i

    # set the gender of the results, 0 = women, 1 = men, 2 = total
    if sheet_index % 3 == 0
      # total sheet
      @gender = 2
    elsif sheet_index % 3 == 1
      @gender = 1
    elsif sheet_index % 3 == 2
      @gender = 0
    end

    (@first_row .. @last_row).each do |row_index|
      # the code column always contains a value
      if @sheet.cell(row_index, @code_column).nil?
        next
      end
      dataset = parse_row(row_index)
      unless dataset.nil?
        @datasets.push(dataset)
      end
    end
  end

  def set_interval(row)
    # new interval
    unless @sheet.cell(row, @interval_column).nil?
      @interval = Interval.new.from_s(@sheet.cell(row, @interval_column))
    end
  end
end