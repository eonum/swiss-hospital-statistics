class SuDCHOPParser < AbstractParser

  def initialize(file)
    super(file)
    #redefine the first row
    @firstRow = 23
  end


  def processRow(row)
    chop_code = ChopCode.new
    # assign fields
    chop_code.code = row[1]
    chop_code.description = row[2]
    # @type [CategorisedData]
    data = chop_code.new_data
    # @type [GeneralIntervalCategory]
    category = data.add(GeneralIntervalCategory.new)

    category.number = row[3]
    category.dad = row[4]
    category.sa = row[5]
    category.min = row[6]
    category.max = row[7]

    percentile_category = category.add(PercentileCategory.new)

    percentiles = [5.0, 10.0, 25.0, 50.0, 75.0, 90.0, 95.0]

    percentile_category.add_all(percentiles.each_with_index.collect {|percentile, index|
                                  perc = PercentileCategory.new
                                  perc.percentile = percentile
                                  perc.amount = row[8 + index] })

    # TODO year hardcoded
    chop_code.add_year(2013, data)

    #TODO field 'interval'
  end

end