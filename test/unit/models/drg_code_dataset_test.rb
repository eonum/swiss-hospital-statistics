require 'test_helper'

class DrgCodeDatasetTest < ActiveSupport::TestCase

  def setup
    # empty test data collections
    Drg.delete_all
    DrgCodeDataset.delete_all

    @dataset = DrgCodeDataset.new
    @dataset.code = "E66B"
    @dataset.description = "Schweres Thoraxtrauma ohne komplizierende Diagnose"

    # persist some sample data to the DB
    @code1 = Drg.new(
               code: "E66B",
               text_de: "Schweres Thoraxtrauma ohne komplizierende Diagnos",
               text_fr: "Traumatisme thoracique sévère sans diagnostic de complication"
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

    drg_code = Drg.where(code: "E66B").first
    assert_equal(@dataset, drg_code.drg_code_datasets.first)
  end

end