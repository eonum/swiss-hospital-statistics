require 'categories/sex_interval_category'
require 'categories/code_description_category'

class Top3IcdStream

  attr_reader :map

  def initialize(clazz = nil)
    self.clazz(clazz)
    @map = {}
    @sex_catalog = []
  end

  def hospital(hospital)
    @hospital = hospital
    @map[@year][@sex][@hospital] = {} unless @map[@year][@sex][@hospital]
  end

  def top3(top3)
    parse_top3(top3)
  end

  def parse_top3(top3)
    groups = split_in_groups(top3)
    groups.each{|group| parse_top3_group(group)}
  end

  def parse_top3_group(group)
    interval = group.first.first
    @map[@year][@sex][@hospital][interval] = [] unless @map[@year][@sex][@hospital][interval]
    group.each{|code_data|
      @map[@year][@sex][@hospital][interval].push(
          {
            code: parse_code(code_data[1]),
            percentage: code_data[2].to_f,
            dad: code_data[3].to_f
          })
    }
  end

  def parse_code(code)
    code.split(' ').first
  end

  def split_in_groups(top3)
    groups = []
    top3.each{ |row|
      if row.first
        groups.push([])
      end
      groups.last.push(row)
    }
    groups
  end

  def tab (tab)
    data = parse_tab(tab)
    @year = data[:year]
    @sex = sex_index(data[:sex])
    @map[@year] = {  } unless @map[@year]
    @map[@year][@sex] = {  } unless @map[@year][@sex]
  end


  def parse_tab (name)
    arr = name.downcase.tr(')', '').tr(' ', '').split('(')
    { year: arr[0].to_i, sex: arr[1]}
  end

  def sex_index(sex)
    @sex_catalog.push(sex) unless @sex_catalog.include?(sex)
    @sex_catalog.find_index(sex)
  end

  def clazz(clazz=nil)
    return @clazz unless clazz
    @clazz = clazz
    self
  end

  def to_codes
    @codes = [  ]
    puts "   creating #{clazz.name}..."
    time_start = Time.now
    hospitals = Hash[HospitalType.all.map{|each| [each.text_de, {text_de: each.text_de, text_fr: each.text_fr, text_it: each.text_it}]}]
    code_cache = {}
    @map.select{|year| year > 2011 }.each {|year, sexes|
      sexes.each{|sex, raw_hospitals|
        raw_hospitals.each{|hospital, raw_intervals|
          raw_intervals.each{ |raw_interval, raw_codes |
            interval = Interval.new.from_s(raw_interval)
            raw_codes.each{|code_data|
              code = @clazz.new
              @codes.push(code)
              short_code = code_data[:code]
              code.code = short_code
              code.year = year
              code_cache[short_code] = IcdCode.where(short_code: short_code).first unless code_cache[short_code]
              cached_code = code_cache[short_code]
              puts "Unknown code: #{short_code} #{year} #{sex}" unless cached_code
              if cached_code
                dataset_data = code.new_data
                interval_category = SexIntervalCategory.new(
                    {
                        interval: interval,
                        sex: sex,
                        dad: code_data[:dad],
                        percentage: code_data[:percentage],
                        hospital: hospitals[hospital]
                    })
                dataset_data.add(interval_category)

                description_category = CodeDescriptionCategory.new(
                    {
                        text_de: cached_code.text_de,
                        text_fr: cached_code.text_fr,
                        text_it: cached_code.text_it,
                        code: cached_code.code,
                        short_code: cached_code.short_code
                    })
                interval_category.add(description_category)
              end
            }
          }
        }
      }
    }
    codes = @codes.sort_by!{|each| each.code.downcase}
    puts "   converted in #{Time.now - time_start} seconds"
    codes
  end
end