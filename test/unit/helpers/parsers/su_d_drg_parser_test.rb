require 'test_helper'

class SuDDRGParserTest < ActiveSupport::TestCase

  def setup
    @parser = SuDDRGParser.new('./test/fixtures/su_d_drg.xls')
  end

  def test_basic_test

  end
end