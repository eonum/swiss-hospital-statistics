require 'test_helper'

class CategorisedDataTest < ActiveSupport::TestCase

  def setup
    @data = CategorisedData.new
  end

  def test_add_category

    category_1 = AbstractCategory.new
    category_2 = AbstractCategory.new
    category_3 = AbstractCategory.new

    @data.add(category_1)
    @data.add(category_2)
    @data.add(category_3)

    assert_equal(category_1.instance_values, @data.at(AbstractCategory.tag).first)
    assert_equal(category_2.instance_values, @data.at(AbstractCategory.tag).second)
    assert_equal(category_3.instance_values, @data.at(AbstractCategory.tag).third)
    assert_equal([category_1.instance_values, category_2.instance_values, category_3.instance_values], @data.at(AbstractCategory.tag))
  end


end