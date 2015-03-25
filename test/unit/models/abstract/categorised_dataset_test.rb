require 'test_helper'

class CategorisedDatasetTest < ActiveSupport::TestCase

  def setup
    @dataset = CategorisedDataset.new
  end

  def test_add_empty_data
    @dataset.build_categorised_data
    @dataset.year = 2012

    assert_equal(CategorisedData, @dataset.categorised_data.class)
    assert_equal(2012, @dataset.year)
  end

  def test_add_category
    @dataset.build_categorised_data

    category_1 = AbstractCategory.new
    category_2 = AbstractCategory.new
    category_3 = AbstractCategory.new

    @dataset.categorised_data.add(category_1)
    @dataset.categorised_data.add(category_2)
    @dataset.categorised_data.add(category_3)

    assert_equal(category_1, @dataset.categorised_data.at(AbstractCategory.tag).first)
    assert_equal(category_2, @dataset.categorised_data.at(AbstractCategory.tag).second)
    assert_equal(category_3, @dataset.categorised_data.at(AbstractCategory.tag).third)
    assert_equal([category_1, category_2, category_3], @dataset.categorised_data.at(AbstractCategory.tag))
  end

end