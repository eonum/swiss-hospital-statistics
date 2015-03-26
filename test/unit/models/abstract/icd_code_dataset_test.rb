require 'test_helper'

class IcdCodeDatasetTest < ActiveSupport::TestCase

  def setup
    # empty test data collections
    IcdCode.delete_all
    IcdCodeDataset

    @dataset = IcdCodeDataset.new
    @dataset.code = "A084"
    @dataset.description = "Virusbedingte Darminfektion, nicht näher bezeichnet"

    # persist some sample data to the DB
    @code1 = IcdCode.new(
               code: "A08.4",
               short_code: "A084",
               text_de: "Virusbedingte Darminfektion, nicht näher bezeichnet",
               text_fr: "Infections intestinales virales, sans précision"
    )
    @code2=  IcdCode.new(
               code: "I86.4",
               short_code: "I864",
               text_de: "Magenvarizen",
               text_fr: "Varices gastriques"
    )

    @code1.save
    @code2.save
  end

  def test_find_one_code
      assert_equal(@code1, @dataset.find_parent)
  end

  def test_persist_on_parent
    parent = @dataset.find_parent
    assert_equal(@code1, parent)

    @dataset.persist_dataset

    icd_code = IcdCode.where(code: "A08.4").first
    assert_equal(@dataset, icd_code.icd_code_datasets.first)
  end

end