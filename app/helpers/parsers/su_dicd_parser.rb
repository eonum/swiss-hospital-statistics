class SuDICDParser < AbstractParser

  def initialize(file)
    super(file)
    #redefine the first row
    @firstRow = 23
  end

  def processRow(row)
    icd_code = IcdCode.new
    # assign fields
    icd_code.code = row[1]
    icd_code.description = row[2]
    # @type [CategorisedData]
    data = icd_code.new_data
    # @type [GeneralIntervalCategory]
    category = data.add(GeneralIntervalCategory.new)

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
    icd_code.addYear(2013, data)

    #TODO field 'n'
    #TODO field 'interval'

    icd_code
  end

end