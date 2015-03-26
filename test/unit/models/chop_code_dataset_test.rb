require 'test_helper'

class ChopCodeDatasetTest < ActiveSupport::TestCase

  def setup
    # empty test data collections
    ChopCode.delete_all
    ChopCodeDataset.delete_all

    @dataset = ChopCodeDataset.new
    @dataset.code = "388511"
    @dataset.description = "Sonstiger chirurgischer Verschluss der A. subclavia"

    # persist some sample data to the DB
    @code1 = ChopCode.new(
               code: "38.85.11",
               short_code: "388511",
               text_de: "Sonstiger chirurgischer Verschluss der A. subclavia",
               text_fr: "Autre occlusion chirurgicale de l'artère sous-clavière"
    )


    @code1.save
  end

  def test_find_one_code
      assert_equal(@code1, @dataset.find_parent)
  end

  def test_persist_on_parent
    parent = @dataset.find_parent
    assert_equal(@code1, parent)

    @dataset.persist_dataset

    chop_code = ChopCode.where(code: "38.85.11").first
    assert_equal(@dataset, chop_code.chop_code_datasets.first)
  end

end