import os
import zipfile
import sys

def zipdir(path, ziph, root_name):
    for root, dirs, files in os.walk(path):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, os.path.join(path, '..'))
            ziph.write(full_path, rel_path)

print("Generating production installable WordPress ZIP packages...")

core_zip = zipfile.ZipFile('hackersshikkhok-core.zip', 'w', zipfile.ZIP_DEFLATED)
zipdir('hackersshikkhok-core', core_zip, 'hackersshikkhok-core')
core_zip.close()
core_size = os.path.getsize('hackersshikkhok-core.zip') / (1024 * 1024)
print(f"[SUCCESS] Built hackersshikkhok-core.zip ({core_size:.2f} MB)")

theme_zip = zipfile.ZipFile('hackersshikkhok-theme.zip', 'w', zipfile.ZIP_DEFLATED)
zipdir('hackersshikkhok-theme', theme_zip, 'hackersshikkhok-theme')
theme_zip.close()
theme_size = os.path.getsize('hackersshikkhok-theme.zip') / (1024 * 1024)
print(f"[SUCCESS] Built hackersshikkhok-theme.zip ({theme_size:.2f} MB)")
