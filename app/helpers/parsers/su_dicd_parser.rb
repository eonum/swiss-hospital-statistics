class SuDICDParser < AbstractParser

  def initialize(file)
    super(file)
    #redefine the first row
    @firstRow = 23
  end

  def processRow(row)
    icdCode = IcdCode.new

    # assign fields
    icdCode.code = row[1]
    icdCode.description = row[2]
    # @type [CategorisedData]
    data = icdCode.newData

    category  = GeneralIntervalCategory.new

    category.dad = row[4]
    category.sa = row[5]
    category.min = row[6]
    category.max = row[7]

    percentileCategory = PercentileCategory.new
    percentileSubCategories = Array.new

    percentiles = [5.0, 10.0, 25.0, 50.0, 75.0, 90.0, 95.0]
    percentiles.each_with_index do |percentile, index|
      perc = PercentileCategory.new
      perc.percentile = percentile
      perc.amount = row[8 + index]
    end

    percentileCategory.categories = percentileSubCategories

    category.categories = [percentileCategory]

    #TODO field 'n'
    #TODO field 'interval'

    return icdCode
  end

end