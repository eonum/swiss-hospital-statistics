require 'test_helper'

class CategorisedCodeTest < ActiveSupport::TestCase

  def setup
    @code = CategorisedCode.new
  end

  def test_add_year_without_data
    @code.add_year(2013)
    @code.add_year(2012)

    assert_equal(CategorisedData, @code.at(2013).class)
    assert_equal(CategorisedData, @code.at(2012).class)
  end

  def test_add_year_with_data
    data_1 = @code.new_data
    data_2 = @code.new_data

    @code.add_year(2013, data_1)
    @code.add_year(2012, data_2)

    assert_equal(data_1, @code.at(2013))
    assert_equal(data_2, @code.at(2012))
  end

  def test_add_category
    @code.add_year(2013)

    category_1 = AbstractCategory.new
    category_2 = AbstractCategory.new
    category_3 = AbstractCategory.new

    @code.at(2013).add(category_1)
    @code.at(2013).add(category_2)
    @code.at(2013).add(category_3)

    puts 'id: '+AbstractCategory.id

    puts @code.at(2013).categories
    puts 'end'
    puts @code.at(2013).categories.class

    assert_equal(category_1, @code.at(2013).at(AbstractCategory.id))
  end

end