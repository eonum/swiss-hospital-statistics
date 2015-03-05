require 'test_helper'

class SuDICDParserTest < ActiveSupport::TestCase

  def setup
    @parser = SuDICDParser.new('./test/fixtures/su_d_icd.xls')
  end

  def test_basic_test
    Array icdCodes = @parser.parse(10)
    assert_equal(10, icdCodes.count)
    assert_equal('A000', icdCodes[0].code)
  end

end
