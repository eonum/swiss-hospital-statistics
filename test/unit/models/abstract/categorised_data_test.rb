require 'test_helper'

class CategorisedDataTest < ActiveSupport::TestCase

  def setup
    @data = CategorisedData.new(2013)
  end

  def test_add_category

    category_1 = AbstractCategory.new
    category_2 = AbstractCategory.new
    category_3 = AbstractCategory.new

    @data.add(category_1)
    @data.add(category_2)
    @data.add(category_3)

    assert_equal(category_1, @data.at(AbstractCategory.id).first)
    assert_equal(category_2, @data.at(AbstractCategory.id).second)
    assert_equal(category_3, @data.at(AbstractCategory.id).third)
    assert_equal([category_1, category_2, category_3], @data.at(AbstractCategory.id))
  end

end