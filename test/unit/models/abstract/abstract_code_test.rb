require 'test_helper'

class AbstractCodeTest < ActiveSupport::TestCase

  def setup
    @code = AbstractCode.new
  end

  def test_add_year_without_data
    @code.add_year(2013)
    @code.add_year(2012)

    assert_equal(AbstractData, @code.at(2013).class)
    assert_equal(AbstractData, @code.at(2012).class)
  end

  def test_add_year_with_data
    data_1 = AbstractData.new
    data_2 = AbstractData.new

    @code.add_year(2013, data_1)
    @code.add_year(2012, data_2)

    assert_equal(data_1, @code.at(2013))
    assert_equal(data_2, @code.at(2012))
  end

end