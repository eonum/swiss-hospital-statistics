require 'test_helper'

class CodeCatalogTest < ActiveSupport::TestCase

  def setup
    @catalog = CodeCatalog.new
  end

  def test_icd_class
    assert_equal(IcdCode, @catalog.code_for_tag("icd"))
  end

end