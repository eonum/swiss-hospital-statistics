require 'test_helper'

class CatalogTest < ActiveSupport::TestCase

  def setup
    @catalog = Catalog.new
  end

  def test_has_extensions
    puts @catalog.codes
    assert(!@catalog.codes.empty?)
  end

end