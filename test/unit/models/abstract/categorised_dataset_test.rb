require 'test_helper'

class CategorisedDatasetTest < ActiveSupport::TestCase

  def setup
    @code = CategorisedDataset.new
  end

  def test_add_year_without_data
    @code.update_with do
      @code.add_year(2013)
      @code.add_year(2012)
    end

    assert_equal(CategorisedData, @code.at(2013).class)
    assert_equal(CategorisedData, @code.at(2012).class)
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

  def test_add_category
    @code.add_year(2013)

    category_1 = AbstractCategory.new
    category_2 = AbstractCategory.new
    category_3 = AbstractCategory.new

    @code.update_with do
      @code.at(2013).add(category_1)
      @code.at(2013).add(category_2)
      @code.at(2013).add(category_3)
    end

    assert_equal(category_1, @code.at(2013).at(AbstractCategory.tag).first)
    assert_equal(category_2, @code.at(2013).at(AbstractCategory.tag).second)
    assert_equal(category_3, @code.at(2013).at(AbstractCategory.tag).third)
    assert_equal([category_1, category_2, category_3], @code.at(2013).at(AbstractCategory.tag))
  end

end