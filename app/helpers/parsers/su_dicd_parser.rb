class SuDICDParser < AbstractParser

  @@firstRow = 21

  def initialize(file)
    @filename = file
  end

  def parse(numberOfRowsToParse)
    @sheet = Roo::Excel.new(@filename)

    @sheet.default_sheet = @sheet.sheets[0]

    # save headers for lookup
    headers = Hash.new
    @sheet.row(@@firstRow).each_with_index { | header , i|
      headers[header] = i
    }

    parsedIcdCodes = Array.new

    firstRowToParse = @@firstRow + 1
    (firstRowToParse ..firstRowToParse + numberOfRowsToParse - 1).each do |row|
      year = @sheet.row(row)[headers['Jahr']]
      code = @sheet.row(row)[headers['ICD-10 Kode']]

      icdCode = IcdCode.new
      icdCode.code = code
      icdCode.text_de = "code: #{code}, year: #{year}"
      parsedIcdCodes << icdCode
      print "Row: #{year}, code: #{code}\n"
    end

    return parsedIcdCodes
  end

end