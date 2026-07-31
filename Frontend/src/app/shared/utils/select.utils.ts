import { Option } from '../../core/models/option.model';

export function mapOptions<T>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T,
  extraKeys: (keyof T)[] = []
): Option[] {

  return data.map(item => {

    const option: any = {
      value: String(item[valueKey]),
      label: String(item[labelKey])
    };

    // propiedades extra
    extraKeys.forEach(key => {
      option[key] = item[key];
    });

    return option;
  });
}