require 'test_helper'

class AbstractCodeTest < ActiveSupport::TestCase

  def setup
    @code = AbstractCode.new
  end

  def test_add_year_without_data
    @code.update_with do
      @code.add_year(2013)
      @code.add_year(2012)
    end

    assert_equal(AbstractData, @code.at(2013).class)
    assert_equal(AbstractData, @code.at(2012).class)
    assert_equal(2013, @code.at(2013).year)
    assert_equal(2012, @code.at(2012).year)
  end

  def test_add_year_with_data
    data_1 = @code.new_data(2013)
    data_2 = @code.new_data(2012)

    @code.update_with do
      @code.add_year(2013, data_1)
      @code.add_year(2012, data_2)
    end

    assert_equal(data_1, @code.at(2013))
    assert_equal(data_2, @code.at(2012))
    assert_equal(2013, @code.at(2013).year)
    assert_equal(2012, @code.at(2012).year)
  end

  def test_at_year_do_add
    data_1 = nil
    data_2 = nil
    data_3 = nil
    @code.update_with do
      data_1 = @code.at(2013, true)
      data_2 = @code.at(2012, true)
      data_3 = @code.at(2013, true)
    end

    assert_equal(data_1, data_3)
    assert_not_equal(data_1, data_2)
  end

end