# SwissDRG system
class System
  include Mongoid::Document
  include MultiLanguageText

  field :version, :type => String
  field :year, :type => String

  field :swissdrg_webgrouper_system_id, :type => String
  field :swissdrg_manual_link, :type => String
end