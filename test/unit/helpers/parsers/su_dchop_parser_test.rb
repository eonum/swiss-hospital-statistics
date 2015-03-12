require 'test_helper'

  class SuDCHOPParserTest < ActiveSupport::TestCase

    def setup
      @parser = SuDCHOPParser.new('./test/fixtures/su_d_chop.xls')
    end

    def test_basic_teset
      Array chopCodes = @parser.parse(10)
      assert_equal(10, chopCodes.count)
      assert_equal('0001', chopCodes[0].code)
    end

  end